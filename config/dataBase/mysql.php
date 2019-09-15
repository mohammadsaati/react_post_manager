<?php 

class ConnectMysql{
   private $hostName = "localhost" ,
            $userName = "android",
            $password  = "1700149113",
            $dataBaseName = "mycms",
            $connection;
   
   function __construct()
   {
       $this->connect();
   }
   

   public function getConnection() {
       return $this->connection;
   }

   function connect() {

       $this->connection = mysqli_connect($this->hostName , $this->userName , $this->password , $this->dataBaseName);
       if(!$this->connection){
           die("Woops! Sorry We have error to connect database.Please try again.");
       }
   }

   public function checkResult($result)
   {
       if(!$result) 
       {
            die("Woops! We have some problem in dataBase queries.");
       }
        else 
        {
            return "It was successful.";
        }
   }

   public function close() {
        mysqli_close($this->connection);
   }

}


?>