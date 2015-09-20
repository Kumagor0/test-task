angular.module("App", ['angularUtils.directives.dirPagination'])
	.controller('MainController', ['$scope', function($scope) {
		$scope.sortedNumbers = []; 
		$scope.currentPage = 1; 

		var numbersCount = 50000;
		$scope.pageSize = 1000;
		var maxNumber = 99;
		var pagesCount = Math.ceil(numbersCount/$scope.pageSize);

		$scope.numbersSum = 0;
		numbers = [];

		for (var i = 0; i < numbersCount; i++) {
			numbers.push({
				value: Math.floor(Math.random() * maxNumber + 1), 
				style: 'non-used'
			});
		};

		$scope.sortedNumbers = []; 

		for (var i = 0; i < pagesCount; i++) {
			var sortedPage = [];
			for (var j = i * $scope.pageSize; j < (i + 1) * $scope.pageSize; j++){
				sortedPage.push(numbers[j]);
			}
		
			sortedPage.sort(function(a, b){ return a.value - b.value; });

			var number;
			for (var j = 0; j < $scope.pageSize; j++) {
				if (sortedPage[j]){
					number = sortedPage[j];
				}else{
					number = {value: '', style: 'non-used'};
				}
				number.numberOnPage=[j];
				$scope.sortedNumbers.push(number);
			}
		};

		$scope.numberClick = function (numberOnPage, currentPage){
			var i = (currentPage - 1) * $scope.pageSize + numberOnPage * 1;
			if ($scope.sortedNumbers[i].style == 'non-used'){
				$scope.sortedNumbers[i].style = 'used';
				$scope.numbersSum = $scope.numbersSum + $scope.sortedNumbers[i].value;
			}
		};
	}]);
