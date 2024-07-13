app.controller("EmployeeController", function($scope, EmployeeService) {
    $scope.employees = [];
    $scope.newEmployee = {};

    // load all employees

    $scope.loadEmployees = function() {
        EmployeeService.getAll().then(
            function(response) {
                $scope.employees = response.data;
                console.log(response.data);
            },
            function(error) {
                console.error("Error loading employees", error);
            }
        );
    };

    $scope.loadEmployees();
});