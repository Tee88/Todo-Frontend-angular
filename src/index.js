var app = angular.module('todo-list', []);

app.controller(
  'todo-list-controller', function($scope, $http){
    $scope.applicationName = 'Todo List';
    $scope.allItems = []
    $scope.edittingmode = false

    $http.get('http://localhost:3000/items.json').then(
      function(success){
        $scope.allItems = success.data
        console.log(success.data)
      },
      function(err){
        console.log(err)
      }  
    );

    $scope.addNewItem = function(){
      var x = {
        description: $scope.itemDescription
      }
      console.log(x)

      $http.post('http://localhost:3000/items.json',{item: x}).then(
        function(success){
          $scope.itemDescrition = '';
          $scope.allItems.push(success.data);
        },
        function(err){
          console.log("eroooooor")
        }
      );
    }

    $scope.deleteItem = function(item) { 
      $http.delete('http://localhost:3000/items/'+item.id+'.json' ).then(
        function(success){
          var index = $scope.allItems.indexOf(item);
          $scope.allItems.splice(index, 1); 
        }

       );  
    }


    $scope.changeItem = function(item) { 

      var y = {
        description: item.description
      }
      $http.put('http://localhost:3000/items/'+item.id+'.json',{item: y}).then(
        function(success){
          item = success.data;
        
        },
        function(err){
          console.log("eroooooor")
        }

       );  
    }

    $scope.itemStatus = function(item) {
      var z = {
        done: item.done
      }
      $http.put('http://localhost:3000/items/'+item.id+'.json',{item: z}).then(
        function(success){
          item = success.data;
        
        },
        function(err){
          console.log("eroooooor")
        }

       ); 

    }


  });
