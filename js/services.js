app.factory('EmployeeService', function($http) {
    var baseUrl = 'https://localhost:44348/api/Employee';

    return {
        getAll: function() {
            return $http.get(baseUrl + '/GetAllEmployees');
        },
        delete: function(id) {
            return $http.post(baseUrl + '/DeleteEmployee', { Id: id });
        },
        create: function(employee) {
            return $http.post(baseUrl + '/AddEmployee', employee)
        },
        update: function(employee) {
            return $http.post(baseUrl + '/UpdateEmployee', employee);
        },
        generateReport: function() {
            return $http.get(baseUrl + '/EmployeeReport', { responseType: 'arraybuffer' });
        }



    }
})