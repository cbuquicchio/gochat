package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"golang.org/x/net/websocket"
)

var broadcast = make(chan *Message)
var connMap = make(map[*websocket.Conn]bool)
var connMapToUsr = make(map[string]*websocket.Conn)

type Message struct {
	Data string `json:"data"`
	User string `json:"user"`
}

/*
   Waits for a message to be sent to the broadcast channel.
   Once a message is found on the channel that message is sent to
   all of the websocket connections that have been established
*/
func handleMessages() {
	/* Loop to send out messages places on the broadcast channel */
	for {
		msg := <-broadcast
		var err error
		for usr, ws := range connMapToUsr {
			err = websocket.JSON.Send(ws, *msg)
			/* Remove from list of connections */
			if err != nil {
				fmt.Fprintf(os.Stderr, "Error sending: %s\n",
					err.Error())

				ws.Close()
				delete(connMapToUsr, usr)
			}
		}
	}
}

/*
   Is the first entrypoint for a websocket connection.
   Once created it is registed to connMap.
   Then the gorountine waits to receive a message from that connection.
   Once a message is recieved it is sent to the broadcast channel to be picked
   up by the handleMessages goroutine
*/
func handleConnections(ws *websocket.Conn) {
	defer ws.Close()
	usr := ws.Request().FormValue("user")
	if usr == "" {
		return
	}

	/* Check to see if username is already registered with a connection */
	_, ok := connMapToUsr[usr]
	if ok {
		return
	}

	connMapToUsr[usr] = ws
	defer delete(connMapToUsr, usr)

	/* Loop to receive messages from ws client */
	for {
		msg := new(Message)
		msg.User = usr
		err := websocket.JSON.Receive(ws, &msg)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error recieving: %s\n",
				err.Error())
			delete(connMapToUsr, usr)
			break
		}

		broadcast <- msg
	}
}

func main() {
	http.Handle("/", http.FileServer(http.Dir("client")))
	http.Handle("/ws", websocket.Handler(handleConnections))

	go handleMessages()

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}
