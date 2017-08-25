(function () {
    angular.module('app')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['$location', '$http', '$route', 'VideoService', 'VideoListsService', 'UserService', 'CommentService'];

    function AdminController($location, $http, $route, VideoService, VideoListsService, UserService, CommentService) {
        var adminCtrl = this;
        adminCtrl.getVideoListsByUser = getVideoListsByUser;
        adminCtrl.getVideosByVideoList = getVideosByVideoList;
        adminCtrl.getCommentsForVideo = getCommentsForVideo;
        adminCtrl.deleteUser = deleteUser;
        adminCtrl.selectUser = selectUser;
        
        getUsers();       
        
        
        function getUsers(){
            UserService.getUsers().then(function(response){
                adminCtrl.users = response.data;
            });
        }
        
        function getVideoListsByUser(user) {
            VideoListsService.getVideoListsByUserId(user.id).then(function(response){
                user.videoLists = response.data;
            });
        }     
        
        function getVideosByVideoList(videoList) {
            VideoService.getVideosByVideoListId(videoList.id).then(function(response){
                videoList.videos = response.data;
            });
        }  
        
        function getCommentsForVideo(video) {
            CommentService.getCommentsForVideo(video.id).then(function (response) {
                video.comments = response.data;
            });
        }
        
        function deleteUser(userId){
            UserService.deleteUser(adminCtrl.user.id).then(function(response){
            	 getUsers();
            }, function(error){

            });
          //  vm.user= {};
        }
        
        function selectUser(user){
            adminCtrl.user = user;
        }
    }
})();