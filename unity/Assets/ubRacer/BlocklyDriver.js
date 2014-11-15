public class BlocklyDriver extends InputDriver
{
    public var blocklyBridge : BlocklyBridge;
    public var car : Car;
    
    public var weightMiddle = 0.2;
    public var weightAlignment = 0.5;

    // Called from blockly on web page to add sensor.
    public function ubCarAddSensor(msg : String)
    {
        var params = msg.Split(","[0]);
        var name = params[0];
        var direction = parseFloat(params[1]) * Mathf.Deg2Rad;
        var length = parseFloat(params[2]);
        
        var xdir = Mathf.Cos(direction);
        var zdir = Mathf.Sin(direction);
        
        super.sensors.AddFeeler(
            name,
            Color.green,
            new Vector3(0, 1, 0),       // offset
            new Vector3(xdir, 0, zdir), // direction
            length,                     // length
            -1);                        // layers
    }
    
    // Called from blockly on web page to update steering.
    public function ubCarSteer(msg : String)
    {
        super.Steer = parseFloat(msg);
    }
    
    // Called from blockly on web page to update throttle.
    public function ubCarThrottle(msg : String)
    {
        super.Throttle = parseFloat(msg);
    }
    
    // Called to post value back to web page for blockly to use.
    private function PostValue(key, val)
    {
        var fullkey = car.name + "." + key;
        blocklyBridge.PostValue(fullkey, val);
    }
    
    // Called to get value back again, for testing when implementing simulated blockly here in javascript.
    private function GetValue(key)
    {
        var fullkey = car.name + "." + key;
        return blocklyBridge.GetValue(fullkey);
    }
    
    protected function Awake()
    {
        if (!blocklyBridge)
        {
            Debug.LogError("Missing BlocklyBridge.");
            enabled = false;
            return;
        }
        
        if (!car)
        {
            Debug.LogError("Missing car.");
            enabled = false;
            return;
        }
        
        super.Awake();
        
        BlocklyAwake();
    }
    
    protected function Update()
    {
        PostValue("speed", Mathf.Round(super.sensors.speed));
        for (var feeler in super.sensors.feelers)
        {
            PostValue(feeler.name + ".sensed", feeler.sensed);
            PostValue(feeler.name + ".distance", Mathf.Round(feeler.distance));
        }
        
        if (Input.anyKey)
        {
            super.Update();
            return;
        }
        
        BlocklyUpdate();
    }

    // Pretend this is blockly running in the web browser.
    function BlocklyAwake()
    {
        ubCarAddSensor("right,35,100");
        ubCarAddSensor("left,-35,100");
    }
    
    function BlocklyUpdate()
    {
        var speed = GetValue("speed");
        var rightFeelerSensed = GetValue("right.sensed");
        var rightFeelerDistance = GetValue("right.distance");
        var leftFeelerSensed = GetValue("left.sensed");
        var leftFeelerDistance = GetValue("left.distance");
        
        var steer = super.Steer;
        var throttle = super.Throttle;
        
        if (rightFeelerSensed && leftFeelerSensed)
        {
            var roadHalfWidth = 0.5 * 25;
            var distanceFromRight = 0.5 * (rightFeelerDistance + leftFeelerDistance);
            var distanceFromMiddle = (distanceFromRight - roadHalfWidth);
            
            var steerForMiddle = distanceFromMiddle / roadHalfWidth;
            var steerForAlignment = (rightFeelerDistance - leftFeelerDistance)/(rightFeelerDistance + leftFeelerDistance);
            
            steer = weightMiddle * steerForMiddle + weightAlignment * steerForAlignment;

            var steerAmount = Mathf.Abs(steer);
            if (speed > 10)
            {
                if (steerAmount > 0.4)
                {
                    throttle = -1;
                }
                else if (steerAmount > 0.2)
                {
                    throttle = 0;
                }
                else
                {
                    throttle = 1;
                }
            }
            else
            {
                throttle += 0.1;
            }
        }
        else
        {
            steer = 0;
            throttle = 0;
        }
        
        ubCarSteer(steer.ToString());
        ubCarThrottle(throttle.ToString());
    }
}
