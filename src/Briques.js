class Briques
{
    getPosx()
    {
        return this.posX;
    }

    getPosy()
    {
        return this.posY;
    }

    getName()
    {
        return this.name;
    }


    constructor(x,y,name)
    {
        this.posX = x;
        this.posY = y;
        this.name = name;
    }
}