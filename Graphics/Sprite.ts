export class Sprite {
  isReady: boolean = false;
  image: Image = new Image();

  constructor(
    imageUrl: string,
    public size: {width: number, height: number} = {width: 10, height: 1}
  ) { 
    this.image.src = imageUrl;
    this.image.onload = () => {
      this.isReady = true;
    };
  }
}