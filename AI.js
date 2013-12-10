    //object is user
    //Amoeba is Creep AI

    var object.name = "Player"; //check if object is user or nonuser
    var Amoeba.size = 10; // Creeps area of attack
    var attack_or_run = 1; //Creeps AI, attack or run from user

    var Amoeba.area.x = amoeba.position.x - object.position.x; //get the distance between the creep and the user
    var Amoeba.area.y = amoeba.position.y - object.position.y;

    Amoeba.area.x = Math.abs(Amoeba.area.x); //square then square root to get positive integer
    Amoeba.area.y = Math.abs(Amoeba.area.y);

    if(object.name == "Player" && (Amoeba.area.x <= Amoeba.size || Amoeba.area.y <= Amoeba.size)
    {
        if(attack_or_run)
        {
            object.v = CANNON.Vec3.object.copy(object);
            Amoeba.v = CANNON.Vec3.Amoeba.copy(Amoeba);
            lerp(Amoeba.v, t, object.v);
            return;
        }
    }
