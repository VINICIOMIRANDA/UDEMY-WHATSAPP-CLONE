import { Firebase } from './../src/util/Firebase';
import { ClassEvent } from '../src/util/ClassEvent';


export class User extends ClassEvent {

    static getRef(){

        return Firebase.db().collection('/users'); // Coleção 
    }

    static findByEmail(email){

        return User.getRef().doc(email);
    }

}