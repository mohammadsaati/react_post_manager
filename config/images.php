<?php 
require_once('./dataBase/mysql.php');
class Images {
    /* Attributes */
    private $patch , 
            $message , 
            $saveingId , 
            $id;

    /* Data base attributes */
    private $connectServer ,
            $result;


    /* Constructor */
    function __construct()
    {
        $this->connectServer = new ConnectMysql();
    }

    /* Set patch */
    public function setPatch($patch)
    {   
        $this->patch = $patch;
    }

    /* Getter functions */
    public function getPatch()
    {
        return $this->patch;
    }
    public function getMessage()
    {
        return $this->message;
    }
    public function getSaveingId()
    {
        return $this->saveingId;
    }

    /* Save post_id and image_id in image_post table */
    public function imagePost($post_id , $image_id)
    {
        $query = "insert ";
        $query .="INTO image_post ( image_id , post_id ) ";
        $query .="VALUES ( {$image_id} , {$post_id} ) ";
        $this->result = mysqli_query($this->connectServer->getConnection() , $query);
        $this->message = $this->connectServer->checkResult($this->result);

    }

    /* Save image */
    public function newImage($post_id)
    {
        $query  = "insert ";
        $query .="INTO images ( patch ) ";
        $query .="VALUE ( '{$this->patch}' ) ";
        $this->result = mysqli_query($this->connectServer->getConnection() , $query);
        $this->message = $this->connectServer->checkResult($this->result);
        
        $this->saveingId = mysqli_insert_id($this->connectServer->getConnection());

        $this->imagePost($post_id ,$this->saveingId);
    }

    /* Update image */
    public function updateImage($image_id)
    {
        $query = "update images ";
        $query .="set patch = '{$this->patch}' ";
        $query .= "where id = {$image_id} ";

        $this->result = mysqli_query($this->connectServer->getConnection() , $query);
        $this->message = $this->connectServer->checkResult($this->result);

    }

    /* Delete image */
    public function deleteImage($image_id)
    {
        $query = "delete images where id = {$image_id} ";

        $this->result = mysqli_query($this->connectServer->getConnection() , $query);
        $this->message = $this->connectServer->checkResult($this->result);
    } 

    /* Get image by ID */
    public function getImageByID($image_id)
    {
        $data = array();

        $query = "select * from images ";
        $query .="where id = {$image_id} ";

        $this->result = mysqli_query($this->connectServer->getConnection() , $query);
        if($this->result) 
        {
            while($row = mysqli_fetch_row($this->result))
             {
               $data = array('patch' => $row['patch']);
            }

            return $data;
        } 
        else
         {
            $this->message = "Woops!We have some problem in our query codes, please solve it(getImageByID).";
        }
    } 

    /* Get post's image's id */ 
    private function getPostImageID($post_id)
    {
        $query = "select image_id from image_post ";
        $query .= "where post_id = {$post_id} ";

        $this->result = mysqli_query($this->connectServer->getConnection() , $query);

        if($this->result) 
        {
            while($row = mysqli_fetch_row($this->result)) 
            {
                $this->id = $row['image_id'];
            }

        }
         else 
        {
            return FALSE;
        }
    }


    /* Get post's image */
    public function getPostImage($post_id)
    {
        $data = array();

        $this->getPostImageID($post_id);
        $query = "select * from images ";
        $query = "where id = {$this->id} ";
        
        $this->result = mysqli_query($this->connectServer->getConnection() , $query);
        
        if($this->result)
        {
            while($row = mysqli_fetch_row($this->result))
            {
                $data = array('patch' => $row['patch']);
            }

            echo json_encode($data);
        }
        else
        {
            $this->message = "Woops!We have some problem in our query codes, please solve it(getPostImage).";
        }

    }
}
?>