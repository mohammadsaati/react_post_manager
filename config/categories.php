<?php
require_once('dataBase/mysql.php');

class Categoris {
    /* Attributs */
    private $cat_title , 
            $cat_discription , 
            $message , 
            $id;

    /* Data base attributes */
    private $connectServer ,
            $result;


    /* Setter functions */
    public function setCatTitle($cat_title)
    {
        $this->cat_title = $cat_title;
    } 
    public function setCatDiscription($cat_discription)
    {
        $this->cat_discription = $cat_discription;
    }
    

    /* Getter functions */
    public function getCatTitle()
    {
        return $this->cat_title;
    }
    public function getCatDiscription()
    {
        return $this->cat_discription;
    }
    public function getMessage()
    {
        return $this->message;
    }


    /* Constructor */
    function __construct()
    {
        $this->connectServer = new ConnectMysql();
    }

    /* Add categories */
    public function newCategory()
    {
        $query = "insert ";
        $query .= "INTO categories ( ";
        $query .= "title , discription ";
        $query .=") VALUES ( ";
        $query .="'{$this->cat_title}' , '{$this->cat_discription}' ";
        $query .=") ";

        $this->result = mysqli_query($this->connectServer->getConnection() , $query);
        $this->message = $this->connectServer->checkResult($this->result);

    }

    /* Delete category */
    public function deleteCategory($catID)
    {
        $query = "delete categories ";
        $query .="where id = {$catID} ";

        $this->result = mysqli_query($this->connectServer->getConnection() , $query);
        $this->message = $this->connectServer->checkResult($this->result);

    }

    /* Get category by ID */
    public function getCatByID($catID)
    {
        $catData = array();
        $query = "select * from categories "; 
        $query .="where id = {$catID} ";

        $this->result = mysqli_query($this->connectServer->getConnection() , $query);

        if($this->result)
        {
            while($row = mysqli_fetch_row($this->result))
            {
                $catData = array (
                    'cat_id' => $row['id'] , 
                    'cat_title' => $row['title'] , 
                    'cat_discription' =>$row['discription']
                );
            }

            echo json_encode($catData);
        }
        else 
        {
            $this->message = "Woops!We have some problem in show data.(getCatByID)";
            echo json_encode($this->message);
        }

    }

    /* Get all categories */
    public function allCategories()
    {
        $allCatData = [];
       

        $query = "select * from categoris ";
        $this->result = mysqli_query($this->connectServer->getConnection() , $query);

        if($this->result) 
        {
            while($row = mysqli_fetch_assoc($this->result))
            {
                $allCatData [] = $row;
            }
           
            echo json_encode($allCatData);
        }
        else 
        {
            $this->message = "Woops!We have some problem in show data.(allCats)";
            echo json_encode($this->message);
        }
    }
}
?>