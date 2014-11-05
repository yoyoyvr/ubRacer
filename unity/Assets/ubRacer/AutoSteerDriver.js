public class AutoSteerDriver extends InputDriver
{
    protected function Update()
    {
        if (Input.anyKey)
        {
            super.Update();
            return;
        }
        
        var left = carSensors.toLeftObstacle;
        var right = carSensors.toRightObstacle;

        if (left + right > 0)
        {
            var steer = 0.5 * (right - left)/(right + left);
            
            if (carSensors.leftward > 0.0)
            {
                steer += 2 * carSensors.leftward;
            }
            else if (carSensors.rightward > 0.0)
            {
                steer -= 2 * carSensors.rightward;
            }
            
            super.Steer = steer;

            if (carSensors.toFrontObstacle < carSensors.speed * 1.0)
            {
                super.Throttle = -1;
            }
            else if (carSensors.toFrontObstacle < carSensors.speed * 2.0)
            {
                super.Throttle = -0.5;
            }
            else if (carSensors.toFrontObstacle < carSensors.speed * 3.0)
            {
                super.Throttle = 0;
            }
            else
            {
                super.Throttle = 1;
            }
            
            if (carSensors.speed < 10)
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
