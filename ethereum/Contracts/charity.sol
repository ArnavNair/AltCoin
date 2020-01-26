pragma solidity^0.4.26;


contract charity{

    string mission;
    address[] public deployedProjects;

    function createProject(string description) public 
    {
        address newProject = new Project(description,msg.sender);
        deployedProjects.push(newProject);
    }

    function getDeployedProjects() public view returns(address[])
    {
        return deployedProjects;
    }


}

contract Project{

    bool public status;
    uint public n = 0 ;
    string public desc;
    mapping (address=>bool) donor;
    mapping (address =>uint) donations;
    address[] public donors;

    address private validator;
    struct Milestone
    { 
        uint ID;
        uint value;
        bool complete;
        address recipient;
        string aim;
    }

    Milestone[] public milestones;

    function getBalance() public returns(uint){
        return (this.balance);
    }



    function Project(string description, address creator) public{
        status = true;
        desc = description;
        validator = creator;
    }


    function createMilestone(uint ID,address recipient, string aim, uint value) public
    {   
        require(msg.sender==validator);
        
        Milestone memory newMilestone = Milestone({
            ID: ID,
            recipient:recipient,
            aim:aim,
            value:value,
            complete:false
        });
        milestones.push(newMilestone);

    }

    function donate() public payable
    { 
        require(!(msg.sender==validator));
        donor[msg.sender] = true;
        donations[msg.sender] = msg.value;
        donors.push(msg.sender);
        n = n + 1;
    }



    function validateAndRelease(uint index) public {
        require(msg.sender==validator);
        require(this.balance >= milestones[index].value);
        milestones[index].complete = true;
        milestones[index].recipient.transfer(milestones[index].value);
    }

    function reject() public {
        require(msg.sender==validator);
        status = false;
        
        while(this.balance > 0 && n>=1)
        {   
            n = n-1;
            
            if(this.balance > donations[donors[n]])
            {
                donors[n].transfer(donations[donors[n]]);
            }
            else
            {
                donors[n].transfer(this.balance);
            }
            
        }
    
    }
}