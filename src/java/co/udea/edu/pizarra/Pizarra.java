/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.udea.edu.pizarra;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
/**
 *Esta clase será la encargada del websocket endpoint, como dato adicional para que este
 * funcione adecuadamente se deberan implementar las funciones onMessage, onOpen y onClose
 * Se ha nombrado a nuestro endpoint como /pizarraendpoint
 * @author Usuario
 */
@ServerEndpoint("/pizarraendpoint")
public class Pizarra {

    //Esta variable almacenará el conjunto de sessiones de la conexion
    private static Set<Session> session = Collections.synchronizedSet(new HashSet<Session>());
   
    
    /**
     * Este metodo tendrá como proposito enviar a todas las conexion remotas
     * la informacion recibida por medio del parametro message
     * @param message
     * @param peer
     * @throws IOException
     * @throws EncodeException 
     */
    @OnMessage
    public void onMessage(String message, Session peer) throws IOException,EncodeException {
       for (Session ses : session){
            if (ses != peer) {
                ses.getBasicRemote().sendText(message);
                System.out.println(ses);
            }
       }
    }
    
 
    /**
     * Este metodo tendrá como objetivo añadir al conjunto de sessiones una nueva
     * @param ses 
     */
    @OnOpen
    public void onOpen(Session ses) {
        session.add(ses);
    }
    /**
     * Este metodo tendrá como objetivo cerrar las sessiones que ya no son necesarias.
     * @param ses 
     */
    @OnClose
    public void onClose(Session ses) {
        session.remove(ses);
    }
    
    
}
