public class AutoSteerDriver extends InputDriver
{
    protected function Awake()
    {
        super.Awake();
        super.sensors.AddFeeler(
            "right",
            Color.green,
            new Vector3(0, 1, 0),   // offset
            new Vector3(1, 0, 1),   // direction
            100,                    // length
            -1);                    // layers
        super.sensors.AddFeeler(
            "left",
            Color.red,
            new Vector3(0, 1, 0),   // offset
            new Vector3(1, 0, -1),   // direction
            100,                    // length
            -1);                    // layers
    }
    
    protected function Update()
    {
        if (Input.anyKey)
        {
            super.Update();
            return;
        }

        var rightFeeler = sensors.GetFeeler("right");
        var leftFeeler = sensors.GetFeeler("left");

        if (rightFeeler.sensed && leftFeeler.sensed)
        {
            var steer = 0.5 * (rightFeeler.distance - leftFeeler.distance)/(rightFeeler.distance + leftFeeler.distance);
            
            //var rightward = feeler.normal.z;
            //steer -= 2 * rightward;
            
            super.Steer = steer;

            steer = Mathf.Abs(steer);
            if (sensors.speed > 10)
            {
                if (steer > 0.4)
                {
                    super.Throttle = -1;
                }
                else if (steer > 0.2)
                {
                    super.Throttle = 0;
                }
                else
                {
                    super.Throttle = 1;
                }
            }
            else
            {
                super.Throttle += 0.1;
            }
        }
        else
        {
            super.Steer = 0;
            super.Throttle = 0;
        }
    }
}
