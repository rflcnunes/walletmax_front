import Cookie from 'js-cookie';

export default {
    auth(to, from, next) {
        const token = Cookie.get('_my_app_token');
        // TODO: verificar token com ajax no back end
        if (!token) {
            next('/not-found');
        }

        next();
    }
}