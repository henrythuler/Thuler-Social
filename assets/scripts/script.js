//Componente da imagem do post
let image = {

    //Recebe um post
    props: ['postsingle'],
    template: `
    
    <div class="post-image">

        <img :src="postsingle.imageUrl"/>

    </div><!--Post Image-->

    `

}

//Componente com as informações do post
let details = {
    props: ["username","postsingle"],
    
    data: function(){

        return {

            comment: "",
            liked: false

        }

    },
    methods: {
        //Função para comentar em um post
        commenting: function(){

            //Se o meu comentário não estiver vazio (desconsiderando espaços inúteis)
            if(this.comment.trim() != ""){

                //Emitimos o evento de comentando, passando o valor do comentário e o resetamos
                this.$emit('commenting', this.comment)
                this.comment = ""

            }

        },
        //Função para curtir um post ao clicar no coração de curtir
        liking: function(){

            //Se já tiver curtido o post
            if(this.liked){

                //Descurte
                this.liked = false
            
            //Se ainda não tiver curtido
            }else{

                //Curte
                this.liked = true

            }

            //Emite o evento de curtindo e passa se a publicação está curtida ou não
            this.$emit('liking', this.liked)

        }
    },
    template: `
    
    <div class="details">

        <div class="user-post">

            <img src="../assets/images/user-picture.png" alt="">
            <span>{{postsingle.user}}</span>

        </div><!--User Post-->

        <div class="comments">

            <p v-for="c in postsingle.comments"><span><b>{{c.commentUser}}</b></span>{{c.commentBody}}</p>

        </div><!--Comments-->

        <div class="likes">

            <div class="likes-image">

                <img v-if="liked" v-on:click="liking" src="../assets/images/liked.png" alt="">
                <img v-if="!liked" v-on:click="liking" src="../assets/images/notliked.png" alt="">

                <span>{{postsingle.likes}} curtidas</span>

            </div><!--Likes Image-->

        </div><!--Likes-->

        <div class="commenting">

            <textarea v-on:keyup.enter="commenting" v-model="comment" placeholder="Adicione um comentário..."></textarea>

        </div><!--Commenting-->

    </div><!--Details-->
    
    `
    
}

//Componente total de cada post
Vue.component('post', {

    //Recebe o nome de usuário, um post e o índice dele
    props: ["username", "onepost", "i"],
    components: {

        'post-image': image,
        'post-details': details,

    },
    methods:{

        //Função para enviar o comentário recebido
        sendcomment: function(c){

            //Emite um evento de enviar comentário com o valor desse comentário e o índice do post que foi comentado
            this.$emit('sendcomment', c, this.i)

        },
        //Função para enviar o curtir/descurtir recebido
        sendliked: function(l){

            //Emite o evento de enviar curtir/descurtir com o valor dele e o índice do post que foi curtido ou descurtido
            this.$emit('sendliked', l, this.i)

        }

    },
    template: `
    
    <div class="post">
    
        <post-image v-bind:postsingle="onepost"></post-image>
        <post-details v-on:liking="sendliked" v-on:commenting="sendcomment" v-bind:postsingle="onepost" v-bind:username="username"></post-details>

    </div>

    `

})

let app = new Vue({

    el: "#app",
    data: {

        //Array contendo todos os posts e as informações necessárias
        posts: [{user: "User", imageUrl:"../assets/images/1.jpg", comments: [{commentUser: "User", commentBody:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed metus sed turpis fringilla eleifend."}, {commentUser:"User#2", commentBody: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}, {commentUser:"User", commentBody:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}, {commentUser:"User", commentBody:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}, {commentUser:"User", commentBody:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}, {commentUser:"User", commentBody:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}, {commentUser:"User", commentBody:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}, {commentUser:"User", commentBody:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}], likes: 251},{user: "User#2", imageUrl:"../assets/images/2.jpg", comments: [{commentUser:"User#2", commentBody: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed metus sed turpis fringilla eleifend."}, {commentUser:"User#3", commentBody: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}], likes: 123}, {user: "User#3", imageUrl:"../assets/images/1.jpg", comments: [{commentUser:"User#3", commentBody:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed metus sed turpis fringilla eleifend."}, {commentUser:"User", commentBody:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}], likes: 785}],
        
        //Nome de usuário
        username: ""

    },
    methods: {

        //Função para adicionar o comentário recebido no post do índice recebido
        addComment: function(c, i){

            //Se o nome de usuário for diferente de vazio (desconsiderando espaços inúteis)
            if(this.username.trim() != ""){

                //Adicionamos o comentário no post específico com o nome de usuário e o valor do comentário (excluindo espaços inúteis)
                this.posts[i].comments.push({commentUser: this.username, commentBody: c.trim()})
            
            }else{

                //Adicionamos o comentário no post específico com o nome de usuário padrão (Guest) e o valor do comentário (excluindo espaços desnecessários)
                this.posts[i].comments.push({commentUser: "Guest", commentBody: c.trim()})

            }

        },

        //Função para adicionar o curtir recebido no post do índice recebido
        addLike: function(l, i){

            //Se o usuário curtir o post
            if(l){

                //Incrementamos o número de curtidas
                this.posts[i].likes++
            
            //Se o usuário descurtir o post
            }else{

                //Decrementamos o número de curtidas
                this.posts[i].likes--

            }

        }

    },
})