/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import View from "@ioc:Adonis/Core/View";

View.global('app_logo', 'https://www.freeiconspng.com/thumbs/soccer-ball-png/soccer-ball-png-33.png');

View.global('nav', [
    {
        name: 'Dashboard',
        icon: `<i class="fa fa-home" aria-hidden="true"></i>`,
        url: '/dashboard',
    },
    {
        name: 'Upload de arquivos',
        icon: `<i class="fa fa-upload" aria-hidden="true"></i>`,
        url: '/upload'
    }
]);