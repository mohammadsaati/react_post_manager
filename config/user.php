<?php
require_once('dataBase/mysql.php');
class User{
    private $id, 
            $firstName ,
             $lastName ,
             $email,
             $role ,
             $displayName;

    protected  $userName ,
               $password,
               $message;

/* DataBase and security attributes */
    private  $connectServer ,
             $result , 
             $userCookies = array('userName' , 'Password'  , 'id');

   //constructor
   function __construct($userName , $password )
   {
     $this->userName = $userName;
     $this->password = $password;
     $this->connectServer  = new ConnectMysql();
   }

    /* Getter funcions */
    public function getId()
    {
        return $this->id;
    }
    public function getMessage(){
        return $this->message;
    }
    public function getuserName()
    {
        return $this->userName;
    }
    public function getPassword()
    {
        return $this->password;
    }
    public function getFirstName()
    {
        return $this->firstName;
    }
    public function getLastName()
    {
        return $this->lastName;
    }
    public function getRole() {
        return $this->role;
    }
    /* Setter functions */
    public function setPassword($password)
    {
        $this->password = $password;
    }
    public function setLastName($lastName)
    {
        $this->lastName = $lastName;
    }
    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;
    }
    public function setEmail($email)
    {
        $this->email = $email;
    }
    public function setRole($role)
    {
        $this->role = $role;
    }
    public function setDisplayName($displayName)
    {
        $this->displayName = $displayName;
    }
   


    //Check cookies is TRUE(cooky set) or FALSE(cooky unset)
    public static function CHECK_COOKIES()
    {
        if((isset($_COOKIE["userName"])) & (isset($_COOKIE["password"])))
        {
            return TRUE;
        }
        else
        {
            return FALSE;
        }
    }
    

    //Check user exists
    protected function userExists()
    {
        $query = "select * from users ";
        $query .= "where  userName ='{$this->userName}'";
       $this->result = mysqli_query($this->connectServer->getConnection() , $query);
       
       if(mysqli_num_rows($this->result) > 0)
       {
          $this->message = "This userName has  already registered , Pleas change an other.";
          
       }
    }

    //Get user's  id
    public function getUserId() {
        

        $query = "select id from users ";
        $query .="where userName = '{$this->userName}' AND password = '{$this->password}' ";
        $this->result = mysqli_query($this->connectServer->getConnection() , $query);

        while($row = mysqli_fetch_assoc($this->result)) {
              $this->id = $row['id'];
        }

      

    }

    //Check userName and password if TRUE user logedIn else show massege
    public function userLogIn()
    {
        $userData = array();

      $query = "select * from users where userName='{$this->userName}' AND password='{$this->password}' ";
        
        $this->result = mysqli_query($this->connectServer->getConnection() , $query);
        
        if(mysqli_num_rows($this->result) <= 0)
        {
            $this->message = "Woops! Your userName or password is wrong , Please check again.";
            $userData = array('message' => $this->message);
            echo json_encode($userData);

        } else {
            while($row = mysqli_fetch_assoc($this->result))
            {
              
                $userData = array(
                    'user_id' => $row['id'],
                   'userName' => $row['userName'],
                   'password' => $row['password'],
                   'firstName' => $row['firstName'],
                    'lastName' => $row['lastName'],
                    'email' => $row['email'] , 
                    'role' => $row['role'] , 
                    'isAuthenticated' => true
                );
            }

            echo json_encode($userData);
        }
    }

    //Log out user whit clean all cookies
    public static function LOG_OUT() {
        setcookie("userName");
        setcookie("password");
        setcookie("id" );

        // header("Location: index.php");
        // exit();

    }

    //Show all users
    public function showAllUser()
    {
        $this->userDatabaseName = $this->getIdentity();
        $query = "select * from {$this->userDatabaseName} ";
        $this->result = mysqli_query($this->connectServer->getConnection() , $query);
        $this->message = $this->connectServer->checkResult($this->result);
    }
    
    //Add user in data base 
    public  function addNewUser()
    {
        $this->userExists();   
        if(empty($this->message))
        {
            $query = "insert ";
            $query .="INTO users ( ";
            $query .="userName , password , firstName , lastName , email  , role  , displayName ";
            $query .=") VALUES ( ";
            $query .="'{$this->userName}' , '{$this->password}' , '{$this->firstName}' , '{$this->lastName}' , '{$this->email}' , '{$this->role}'  , '{$this->displayName}' ";
            $query .=") ";
            $this->result = mysqli_query($this->connectServer->getConnection() , $query);
            $this->message = $this->connectServer->checkResult($this->result);
        }
        
    }

    //Update user
    public function updateUser()
    {
 
        $query = "update users ";
        $query .="set firstName = '{$this->firstName}' ,
                 lastName = '{$this->lastName}' ,
                 displayName = '{$this->displayName}' ,
                 email = '{$this->email}' , 
                 role = '{$this->role}' ";
        $query .="where userName = '{$this->userName}' ";
        $this->result = mysqli($this->connectServer->getConnection() , $query);
        $this->message = $this->connectServer->checkResult($this->result);
    }

    /* Chenge password */
    public function changePassword($newPassword)
    {
        $query = "update users ";
        $query .="set password = '{$newPassword}' ";
        $query .="where userName = '{$this->userName}'AND password = {$this->password} ";
        $this->result = mysqli_query($this->connectServer->getConnection() , $query);
        $this->message = $this->connectServer->checkResult($this->result);
    }

    //Delete user
    public function deleteUser()
    {

        $query = "delete users ";
        $query .="where userName = '{$this->userName}'";
        $this->result = mysqli_query($this->connectServer->getConnection() , $query);
        $this->message = $this->connectServer->checkResult($this->result);
    }

}
?>