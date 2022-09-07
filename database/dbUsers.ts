import bcrypt from 'bcryptjs';

import { User } from '../models';
import { db } from '.';



export const checkUserEmailPassword = async (email: string, password: string) => {

    await db.connect();
    const user = await User.findOne({ email });

    await db.disconnect();

    if (!user) {
        return null;
    }

    if (!bcrypt.compareSync(password, user.password!)) {
        return null;
    }
    console.log('user', user)

    const { role, name, _id, image } = user;

    return {
        _id,
        email: email.toLocaleLowerCase(),
        role,
        name,
        image
    }
}


// Esta función crea o verifica el usuario de OAuth
export const oAUthToDbUser = async (oAuthEmail: string, oAuthName: string, oAuthImage: string) => {

    await db.connect();
    const user = await User.findOne({ email: oAuthEmail });

    if (user) {
        await db.disconnect();
        const { _id, name, email, role, image } = user;
        return { _id, name, email, role, image };
    }

    const newUser = new User({ email: oAuthEmail, name: oAuthName, image: oAuthImage, password: '@', role: 'client' });
    await newUser.save();
    await db.disconnect();

    const { _id, name, email, role, image } = newUser;
    return { _id, name, email, role, image };

}