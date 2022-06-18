import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Users from 'App/Models/Users'

export default class TesteController {
    async renderIndex({ view } : HttpContextContract){
        let user = await Users.findBy('email', 'tsales@yopmail.com');
            if(user){
                user.name = "Thiago Sales";
                await user?.save();
            }

        return view.render('teste', {
            usuarios: await Database.from('users').select("*")
        })
    }

    async saveRoute({request, response} : HttpContextContract){
        const {id, email} = request.all();
        console.log(id, email)
        response.json({teste: true});
    }

    async getPost({request, response, params} : HttpContextContract){
        const { id } = params;
        //..trazer todos os dados do post -> id
        response.json({teste: true});
    }
}
