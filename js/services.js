app.factory('EmployeeService', function($http) {
    var baseUrl = 'https://localhost:44348/api/Employee';

    return {
        getAll: function() {
            return $http.get(baseUrl + '/GetAllEmployees');
        },
        delete:function(id){
            return $http.delete(baseUrl+'/DeleteEmployee'+id);
        }
    }
})