var app = angular.module('pro300App', ["ngRoute"]);

app.service('DialogService', DialogService);
app.service('SelectService', SelectService);
app.service('DataService', DataService);
app.service('AuthService', AuthService);
app.service('CursoService', CursoService);
app.service('AtividadeService', AtividadeService);

app.controller('AtividadeController', AtividadeController);
app.controller('LoginController', LoginController);
app.controller('UsuarioController', UsuarioController);

app.config(RouteConfig);
app.run(OnRouteChangeStart);

/*
function AuthInterceptor($location, AuthService, $q) {
    return {
        request: function(config) {
            config.headers = config.headers || {};

            if (AuthService.getToken()) {
                config.headers['Authorization'] = 'Bearer ' + AuthService.getToken();
            }

            return config;
        },
        responseError: function(response) {
            if (response.status == 401 || response.status == 403) {
                $location.path('/signin');
            }

            return $q.reject(response);
        }
    }
}
*/
/*
app.factory('AuthInterceptor', AuthInterceptor)
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    });
*/