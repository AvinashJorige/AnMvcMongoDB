app.controller("DefaultController", function (GetInitData, $scope, $state, cacheManager, $rootScope) {
    this.title = "Angular + ASP.NET + MongoDB";
    GetInitData.GetAllData().then(function (d) {
        if (d.data['status'] == 400) {
            alert("Error : " + d.data.message);
        }
        if (d.data['status'] == 200) {
            $scope.data = d.data.data;
            for (i = 0; i < d.data.data.length; i++) {
                var PrevData = cacheManager.getItem(d.data.data[i]['Id']);
                if (!PrevData) {
                    cacheManager.addItems(d.data.data[i]['Id'], d.data.data[i]);
                }
            }
        }
    });

    $scope.AddSample = function () {
        if ($scope.sampleData != null) {

            var sampleInfo = {};
            var address = {};
            address.streetAddress = $scope.sampleData.street;
            address.city = $scope.sampleData.city;
            address.state = $scope.sampleData.state;
            address.postalCode = $scope.sampleData.postalCode;

            var phoneNumber = [];
            var phoneType = {};
            phoneType.type = 'Home';
            phoneType.number = $scope.sampleData.home;
            phoneNumber.push(phoneType);
            phoneType = {};
            phoneType.type = 'Fax';
            phoneType.number = $scope.sampleData.fax;
            phoneNumber.push(phoneType);

            sampleInfo.firstName = $scope.sampleData.firstName;
            sampleInfo.lastName = $scope.sampleData.lastName;
            sampleInfo.age = $scope.sampleData.age;
            sampleInfo.address = address;
            sampleInfo.phoneNumber = phoneNumber;

            GetInitData.AddSample(sampleInfo).then(function (d) {
                if (d.data['status'] == 400) {
                    alert("Error : " + d.data.message);
                }

                if (d.data['status'] == 200) {                    
                    $scope.sampleDataInformation = {};
                    $state.go('getAll');
                }
            });
        }
        else {
            alert("Something went wrong... Fill the form again after page reload.");
        }
    }

    $scope.getDeleteSample = function (id) {
        try {
            if (id) {
                GetInitData.DeleteSample(cacheManager.getItem(id)).then(function (d) {
                    if (d.data['status'] == 400) {
                        alert("Error : " + d.data.message);
                    }

                    if (d.data['status'] == 200) {
                        $state.reload();
                    }
                });
            }
        } catch (e) {
            alert("Some thing went wrong...");
        }
    }
})
.controller("EditController", function (GetInitData, $scope, $state, cacheManager, $rootScope, $stateParams) {
    var sampleId = $stateParams.sampleId;
    if (sampleId) {
        $scope.getEditSample = cacheManager.getItem(sampleId);
    }

    $scope.updateSample = function () {
        if ($scope.getEditSample != null) {
            GetInitData.UpdateSample($scope.getEditSample).then(function (d) {
                if (d.data['status'] == 400) {
                    alert("Error : " + d.data.message);
                }

                if (d.data['status'] == 200) {
                    $scope.sampleUpdateDataInformation = {};
                    $state.go('getAll');
                }
            });
        }
        else {
            alert("Something went wrong... Fill the form again after page reload.");
        }
    }

})