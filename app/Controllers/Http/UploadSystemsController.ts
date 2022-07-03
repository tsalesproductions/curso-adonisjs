import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UploadSystemsController {
    async index({view}: HttpContextContract){
        return view.render('upload');
    }

    async uploadFiles({request, response}){
        const coverImage = request.file('upload', {
            size: '2mb',
            extnames: ['jpg', 'png', 'gif'],
          })
          
          if (!coverImage) {
            return
          }
          
          if (!coverImage.isValid) {
            return coverImage.errors
          }
          
          let newName = new Date().getTime()+"."+coverImage.extname;
          await coverImage.move(Application.publicPath('uploads'),
          {
            name: newName
          });

          return response.send("ok");
          
    }
}
