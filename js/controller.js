app.controller("EmployeeController", function ($scope, EmployeeService) {
  $scope.employees = [];
  $scope.newEmployee = {};

  // load all employees

  $scope.loadEmployees = function () {
    EmployeeService.getAll().then(
      function (response) {
        $scope.employees = response.data;
        console.log(response.data);
      },
      function (error) {
        console.error("Error loading employees", error);
      }
    );
  };

  $scope.deleteEmployee = function (id) {
    EmployeeService.delete(id).then(
      function (response) {
        $scope.loadEmployees();
      },
      function (error) {
        console.error("error deleting employee:", error);
      }
    );
  };

  $scope.loadEmployees();
});
