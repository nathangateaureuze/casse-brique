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

    getColor()
    {
        return this.color;
    }

    getName()
    {
        return this.name;
    }


    constructor(x,y,color,name)
    {
        this.posX = x;
        this.posY = y;
        this.color = color;
        this.name = name;
    }
}