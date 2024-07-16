app.controller("EmployeeController", function($scope, EmployeeService) {
    $scope.employees = [];
    $scope.newEmployee = {};
    $scope.isEditing = false;

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

    $scope.deleteEmployee = function(employee) {
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
                function(response) {
                    $scope.loadEmployees();
                },
                function(error) {
                    console.error("error deleting employee:", error);
                }
            );
        }
    };

    $scope.addOrUpdateEmployee = function() {
        if ($scope.isEditing) {
            EmployeeService.update($scope.newEmployee).then(
                function(response) {
                    $scope.loadEmployees();
                    $scope.newEmployee = {};
                    $scope.isEditing = false;
                    alert("Employee updated successfully");
                    $('#addEmployeeModal').modal('hide');
                },
                function(error) {
                    console.error("Error updating employee", error);
                }
            );
        } else {
            EmployeeService.create($scope.newEmployee).then(
                function(response) {
                    $scope.loadEmployees();
                    $scope.newEmployee = {};
                    alert("Employee added successfully");
                    $("#addEmployeeModal").modal("hide");
                },
                function(error) {
                    console.error("Error adding employee:", error);
                }
            );
        }
    };

    $scope.editEmployee = function(employee) {
        $scope.newEmployee = angular.copy(employee);
        $scope.newEmployee.DOJ = new Date(employee.DOJ);
        $scope.isEditing = true;
        $('#addEmployeeModal').modal('show');

    };


    $scope.printEmployee = function(employee) {

        EmployeeService.generateSingleReport(employee).then(
            function(response) {
                var blob = new Blob([response.data], { type: 'application/pdf' });
                var downloadUrl = URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = downloadUrl;
                a.target = '_blank';
                a.download = 'Employee.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

            },
            function(error) {
                console.error("Error generating report", error);
            }

        );
    };

    $scope.printAllEmployees = function() {
        EmployeeService.generateReport().then(
            function(response) {
                var blob = new Blob([response.data], { type: 'application/pdf' });
                var downloadUrl = URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = downloadUrl;
                a.target = '_blank';
                a.download = 'Employees.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            },
            function(error) {
                console.error("Error generating report", error);
            }
        );
    };

    $scope.loadEmployees();
});