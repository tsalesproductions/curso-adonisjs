import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database';
import Project from 'App/Models/Project';
import User from 'App/Models/User';

export default class AuthController {
    async loginIndex({view}: HttpContextContract){
        return view.render('login');
    }

    async login({request, response, auth, session}: HttpContextContract){
        const { email, password } = request.all();

        const userDate = User.findBy('email', email);

        if(!userDate){
            session.flash('notification', 'Usuário ou senha inválidos')
            return response.redirect('back');
        }

        try {
            await auth.use('web').attempt(email, password);

            session.put('user_notifications', {
                total: 10,
                data: []
            })

            let projects = await Project.query().select('*');

            session.put('projects', {
                total: projects.length,
                data: projects
            });

            return response.redirect('/dashboard');
        } catch (error) {
            console.log(error);
            session.flash('notification', 'Usuário ou senha inválidos')
            return response.redirect('back');
        }


    }

    async registerIndex({ view }: HttpContextContract){
        return view.render('register');
    }

    async register({request, response}: HttpContextContract){
        const newUserSchema = await request.validate({
            schema: schema.create({
                name: schema.string(),
                email: schema.string([
                  rules.email(),
                  rules.unique({table: 'users', column: 'email'})
                ]),
                password: schema.string({})
            }),
            messages: {
                'email.unique': 'Este e-mail já está sendo utilizado!',
                required: 'Esses campos são obrigatórios!'
            }
        })

        try {
            const user = await User.create(newUserSchema);
            return response.redirect('/auth/login')
        } catch (error) {
            console.log(error);
        }
    }

    async logout({auth, response}: HttpContextContract){
        await auth.logout();
        return response.redirect('/auth/login')
    }
}
