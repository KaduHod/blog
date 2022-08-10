interface Muscle{
  name:string;
}

interface Exercise{
  link:string;
  name:string;
  muscles:Array<string>;
}

export {Muscle, Exercise}

