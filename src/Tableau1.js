class Tableau1 extends Phaser.Scene{

    preload()
    {
        this.load.image("carre","assets/carre.png")
        this.load.image("cercle","assets/cercle.png")
    }

    create()
    {
        let me = this;

        this.hauteur=800
        this.largeur=800

        this.scores = 0
        this.vie = 3

        this.cassage = 0

        this.murgauche = this.physics.add.image(0,0, "carre").setOrigin(0,0)
        this.murgauche.setDisplaySize(20,this.hauteur)
        this.murgauche.body.setAllowGravity(false)
        this.murgauche.setImmovable(true)

        this.murdroite = this.physics.add.image(this.largeur-20,0,"carre").setOrigin(0,0)
        this.murdroite.setDisplaySize(20,this.hauteur)
        this.murdroite.body.setAllowGravity(false)
        this.murdroite.setImmovable(true)

        this.murhaut = this.physics.add.image(0, 0,"carre").setOrigin(0,0)
        this.murhaut.setDisplaySize(this.largeur,20)
        this.murhaut.body.setAllowGravity(false)
        this.murhaut.setImmovable(true)

        this.raquette = this.physics.add.image(this.largeur/2-100,this.hauteur-20,"carre").setOrigin(0,0)
        this.raquette.setDisplaySize(200,20)
        this.raquette.body.setAllowGravity(false)
        this.raquette.setImmovable(true)
        this.raquette.setTintFill(0xffffff);


        this.balle = this.physics.add.image(this.largeur/2,this.hauteur/2+200,"cercle").setOrigin(0,0)
        this.balle.setDisplaySize(20,20)
        this.balle.setBounce(1.5,1.5)
        this.balle.setTintFill(0xffffff);
        this.balle.setVelocityX(100)
        this.balle.setVelocityY(100)
        this.balle.body.setMaxVelocity(300)
        this.physics.add.collider(this.balle,this.murhaut)
        this.physics.add.collider(this.balle,this.murgauche)
        this.physics.add.collider(this.balle,this.murdroite)
        this.physics.add.collider(this.balle,this.raquette,function(){me.rebond(me.raquette)});

        //briques
        for (let i=0;i<9;i++)
        {
            for (let j=1;j<=5;j++)
            {

                this.brique = new Briques(120+i*61,100+j*31,"brique"+i+j)
                let b = this.physics.add.image(this.brique.posX,this.brique.posY,"carre").setOrigin(0,0)
                b.setDisplaySize(60,30)
                b.body.setAllowGravity(false)
                b.setImmovable(true)

                if (i === 3 && j === 4)
                {
                    b.setTintFill(0x02ff00)
                    b.isVerte=true;
                }
                if (i === 4 && j === 4)
                {
                    b.setTintFill(0xff0000)
                    b.isRouge=true;
                }

                this.physics.add.collider(this.balle,b,function(){
                    me.percutation(b)
                });
            }
        }

        this.touches()
    }

    //vitesses de la raquette
    touches()
    {
        let me=this;

        //touches enfoncées
        this.input.keyboard.on('keydown', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.vitesse = -1
                    break;
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.vitesse = 1
                    break;
            }
        });
        //touches relachées
        this.input.keyboard.on('keyup', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.vitesse = 0
                    break;
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.vitesse = 0
                    break;
            }
        });
    }


    rebond(raquette)
    {
        let hauteurRaquette = raquette.displayHeight;

        let positionRelativeRaquette = (this.balle.y - raquette.y);

        positionRelativeRaquette = (positionRelativeRaquette / hauteurRaquette)
        positionRelativeRaquette = positionRelativeRaquette*2-1;

        this.balle.setVelocityY(this.balle.body.velocity.y + positionRelativeRaquette * 1000);
    }

    sortie()
    {
        if (this.vie === 0)
        {
            alert("perdu")
            location.reload()
        }
        this.balle.x = this.largeur/2
        this.balle.y = this.hauteur/2+200
        this.balle.setVelocityX(100)
        this.balle.setVelocityY(100)
        this.vie-=1
    }

    percutation(brique)
    {
        if (brique.isVerte === true)
        {
            this.vie+=1
        }
        if (brique.isRouge === true)
        {
            this.score+=9
        }

        brique.destroy()
        this.scores+=1

        this.cassage+=1
    }


    update()
    {
        //déplacement de la raquette
        if(this.vitesse === 1 && this.raquette.x<this.largeur-220)
        {
            this.raquette.setPosition(this.raquette.x+5,this.raquette.y)
        }
        if(this.vitesse === -1 && this.raquette.x>20)
        {
            this.raquette.setPosition(this.raquette.x-5,this.raquette.y)
        }

        //sortie de balle
        if (this.balle.y>=this.hauteur)
        {
            this.sortie()
        }

        if (this.cassage === 45)
        {
            alert("Gagné!")
            location.reload()
        }

        //affichage des points
        this.$el = document.getElementById("vie");
        this.$vie = document.getElementById("vie")
        this.$vie.textContent = this.vie
        this.$scores = document.getElementById("scores")
        this.$scores.textContent = this.scores
    }
}
