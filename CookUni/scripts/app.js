import { get, post, put, del} from './requester.js'

(()=>{
    const app = Sammy('#rooter', function(){
        this.use('Handlebars','hbs');

        this.get('/index.html',function(ctx){
           setHeaderInfo(ctx);

           if(ctx.isAuth){
            get('appdata','recipes','Kinvey')
            .then((recipes)=>{
                ctx.recipes = recipes;
                this.loadPartials(getPartials())
                .partial('./views/home.hbs')
            });

           }else{
            this.loadPartials(getPartials())
            .partial('./views/home.hbs')
           }
            
        });

        this.get('/register',function(ctx){
            setHeaderInfo(ctx)
            this.loadPartials(getPartials())
            .partial('./views/auth/register.hbs')
        })

        this.get('/login',function(ctx){
            setHeaderInfo(ctx)
            this.loadPartials(getPartials())
            .partial('./views/auth/login.hbs')
        })

        this.post('/register',function(ctx){
            const{firstName,lastName,username,password,repeatPassword} = ctx.params;

            if(firstName && lastName && username && password && password === repeatPassword){
                post('user','login',{firstName,lastName,username,password},'Basic')
                .then(userInfo=>{
                    saveAuthInfo(userInfo);
                    ctx.redirect('/index.html')
                }).catch(console.error)
            }
        })

        this.post('/login',function(ctx){
           const { username, password } = ctx.params;

           if(username && password){
           post('user','login',{username,password},'Basic')
           .then((userInfo)=>{
               saveAuthInfo(userInfo);
            ctx.redirect('./index.html')
           }).catch(console.error);

            }
        })

        this.get('/logout',function(ctx){
            post('user', '_logout', {}, 'Kinvey')
            .then(()=>{
                sessionStorage.clear(); 
                ctx.redirect('./index.html');
                
            }).catch(console.error)
        })

        this.get('/share',function(ctx){
            setHeaderInfo(ctx);
            this.loadPartials(getPartials())
            .partial('./views/recipe/share.hbs');
        });

        this.post('/share',function(ctx){
            const {meal, ingredients,prepMethod,description,foodImageURL,category} = ctx.params;
            const categories = {
                "Vegetables and legumes/beans":"https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549__340.jpg" ,
                "Fruits": "https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg",
                "Grain Food":"https://cdn.pixabay.com/photo/2014/12/11/02/55/corn-syrup-563796__340.jpg",
                "Milk, cheese, eggs and alternatives":"https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg",
                "Lean meats and poultry, fish and alternatives":"https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg"
            }
            if(meal && ingredients && prepMethod && description && foodImageURL && category){
                post('appdata','recipes', {meal,
                     ingredients: ingredients.split(' '),
                     prepMethod,
                     description,
                     foodImageURL,
                     category,
                    likesCounter:0,
                    categoryImageURL:categories[category]
                },'Kinvey')
                .then((newRecipie)=>{
                    ctx.redirect('/index.html')
                }).catch(console.error)

            }
        })

        this.get('/recipe/:id',function(ctx){
            setHeaderInfo(ctx)
            const id = ctx.params.id;

            get('appdata',`recipes/${id}`,'Kinvey')
            .then((recipe)=>{
                recipe.isCreator = sessionStorage.getItem('userId') === recipe._acl.creator;

                ctx.recipe = recipe;
                
                this.loadPartials(getPartials())
                .partial('../views/recipe/recipe-details.hbs')
            }).catch(console.error)
        })

        this.get('/like/:id',function(ctx){
            const id = ctx.params.id;
           

           get('appdata',`recipes/${id}`,'Kinvey').then((recipe)=>{
            ctx.recipe = recipe;
            recipe.likesCounter = recipe.likesCounter+1;
           }).catch(console.error)
          
            put('appdata',`recipes/${id}`,{meal,ingredients,prepMethod,description,category,foodImageURL,categoryImageURL,likesCounter},'Kinvey')
            .then((recipe)=>{
                ctx.recipe = recipe;
                ctx.redirect(`./recipe/${id}`)
            })
        })

        this.get('/edit/:id',function(ctx){
            setHeaderInfo(ctx);
            const id = ctx.params.id;

          get('appdata', `recipes/${id}`, 'Kinvey')
          .then((recipe)=>{
              ctx.recipe = recipe;
            
              this.loadPartials(getPartials())
              .partial('../views/recipe/recipe-edit.hbs')
          })


        })
        
        this.post('/edit/:id',function(ctx){
            const id = ctx.params.id;

            const {meal, ingredients,prepMethod,description,foodImageURL,category} = ctx.params;
            const categories = {
                "Vegetables and legumes/beans":"https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549__340.jpg" ,
                "Fruits": "https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg",
                "Grain Food":"https://cdn.pixabay.com/photo/2014/12/11/02/55/corn-syrup-563796__340.jpg",
                "Milk, cheese, eggs and alternatives":"https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg",
                "Lean meats and poultry, fish and alternatives":"https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg"
            }
            if(meal && ingredients && prepMethod && description && foodImageURL && category){
                put('appdata',`recipes/${id}`, {meal,
                     ingredients: ingredients.split(' '),
                     prepMethod,
                     description,
                     foodImageURL,
                     category,
                    categoryImageURL:categories[category]
                },'Kinvey')
                .then((newRecipie)=>{
                    ctx.redirect('/index.html')
                }).catch(console.error)

            }
        })

        function saveAuthInfo(userInfo){
            sessionStorage.setItem('authtoken',userInfo._kmd.authtoken);
            sessionStorage.setItem('fullName',userInfo.firstName + ' '+ userInfo.lastName);
            sessionStorage.setItem('userId',userInfo._id);
        }

        function setHeaderInfo(ctx){
            ctx.isAuth = sessionStorage.getItem('authtoken') !== null;
            ctx.fullName = sessionStorage.getItem('fullName')
        
        }

        function getPartials(){
            return {
                header: './views/common/header.hbs',
                footer: './views/common/footer.hbs'
            }
        }
    })

    app.run();
})()