let routes = {
    //index page (default page)
    '/' : {
        name : 'index',
        matched(){
            document.title = "walkifyjs - demo";
            let data = {
                description : "a lighweight routing javascript libray for creating simple SPA apps"
            };
            fetch('views/index.html')
            .then((res) => {
                //throwing an error on purpose,
                //uncomment below line to see how it works
                // throw new Error('');
                return res.text();
            }).then((template) => {
                hideLoader();
                //inline template is ignored when you pass second argument
                this.view(data, template);
            }).catch((e) => {
                let data = {
                    message : "something went wrong"
                }
                //redirecting to 404 view with a message
                router.redirectTo('!', data);

            });
        },
        /* onExist hook
        /* calls this method before switching to another route
        */
        exist(){
            showLoader();
        }
    },

    //matches about
    '/about' : {
        name : 'about',
        matched(){
            document.title = "walkifyjs - demo";
            let data = {};
            data['user'] = "Frank";
            // this.view(data);
            fetch('views/about.html')
            .then((res) => {
                //throwing an error on purpose,
                //uncomment below line to see how it works
                // throw new Error('');
                return res.text();
            }).then((template) => {
                hideLoader();
                //inline template is ignored when you pass second argument
                this.view(data, template);
            }).catch((e) => {
                let data = {
                    message : "something went wrong"
                }
                //redirecting to 404 view with a message
                router.redirectTo('!', data);
            });
        },
        //calls this method when the view is mounted
        mounted(){
            //dom is ready!
            console.log('mounted about');
        },
        exist(){
            showLoader();
        }
    },

    //matches anything that begins with '/about/
    '/about/*' : {
        name : 'about',
        matched(){
            document.title = "walkifyjs - demo";
            hideLoader();
            this.view({
                user : "Frank"
            });
        },
        exist(){
            showLoader();
        }
    },

    /*
    /* support for dynamic match using regex.
    /* the below route will match something like '/home/9/test/foo' 
    */
  
    '/home/{id:[0-9]+}/test/{name:[a-y]+}' : {
        name : 'homeplus',
        matched(id, name){
            document.title = "walkifyjs - demo";
            hideLoader();
            let data = {
                id,
                name
            };
            this.view(data);
        },
        mounted(){
            console.log('mounted');
        },
        exist(){
            showLoader();
        }
    },

    '/docs' : {
        matched(){
            document.title = "walkifyjs - documentation";
            // hideLoader();
            fetch('views/docs.html')
            .then((res) => {
                //throwing an error on purpose,
                //uncomment below line to see how it works
                // throw new Error('');
                if(res.status == 404){
                    throw new Error('couldnt fetch page');
                }
                return res.text();
            }).then((template) => {
                hideLoader();
                // template = formartComment(template, 'comment');
                //inline template is ignored when you pass second argument
                this.view({}, template);
            }).catch((e) => {
                let data = {
                    message : e || "something went wrong"
                }
                //redirecting to 404 view with a message
                router.redirectTo('!', data);
            });
        },
        mounted(){
            let htmlHighlight = new Highlight('.html-code-example', 'html');
            let jsHighlight = new Highlight('.js-code-example', 'js');
            htmlHighlight.mark();
            jsHighlight.mark();
        }
    },
    //registering 404 route
    '!' : {
        name : '404',
        matched(){
            document.title = "walkifyjs - 404";
            //this object is ignored when this view is called from redirectTo method
            hideLoader();
            let data = {
                message : 'page not found'
            };
           this.view(data);
        },
        exist(){
            showLoader();
        }
    }
}

//instatiating walkify Class with routes Object as the argument;
let router = new Walkify(routes);
//mounting to the container with class 'app'
router.mount('.app');
/*
or one liner
let router = new Walkify(routes).mount('.app');

*/
