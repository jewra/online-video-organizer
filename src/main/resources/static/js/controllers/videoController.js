(function () {
    angular.module('app')
            .controller('VideoController', VideoController);

    VideoController.$inject = ['$location', '$http', '$route', 'VideoService', '$routeParams', '$sce', 'CommentService', 'UserService'];

    function VideoController($location, $http, $route, VideoService, $routeParams, $sce, CommentService, UserService) {
        var videoCtrl = this;
        videoCtrl.getCommentsForVideo=getCommentsForVideo;

        init();

         function init() {
            videoCtrl.embeddedVideoUrl = $sce.trustAsResourceUrl("//www.youtube.com/embed/" + $routeParams.videoId);
            getCommentsForVideo($routeParams.videoId);
        }     
         
         function getCommentsForVideo(videoId) {
             CommentService.getCommentsForVideo(videoId).then(function (response) {
                 videoCtrl.comments = response.data;
             })
         }
         
         function postComment(comment) {
            // videoCtrl.comments = [];
           //  videoCtrl.comments.push({content:comment.content, user:UserService.getLoggedInUserId(), video:$routeParams.videoId,  creationDate:(new Date()).getTime()});
             CommentService.saveComment(comment).then(function(){
            	 getCommentsForVideo($routeParams.videoId); 
                   
                 });
         
            // delete videoCtrl.comment;
         }
       
    }

})();
