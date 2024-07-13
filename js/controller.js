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

  $scope.deleteEmployee = function (employee) {
    var confirmDelete = confirm(
      "Are you sure you want to delte this employee?\n" +
        "ID:" +
        employee.Id +
        "\n" +
        "Name:" +
        employee.EmployeeName +
        "\n" +
        "Date of Joining:" +
        employee.DOJ +
        "\n" +
        "Department:" +
        employee.Department +
        "\n" +
        "Company:" +
        employee.Company
    );
    if (confirmDelete) {
      EmployeeService.delete(employee.Id).then(
        function (response) {
          $scope.loadEmployees();
        },
        function (error) {
          console.error("error deleting employee:", error);
        }
      );
    }
  };

  $scope.loadEmployees();
});
