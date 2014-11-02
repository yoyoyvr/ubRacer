public class AutoSteerDriver extends InputDriver
{
    var car : Car;
    
    protected function Update()
    {
        if (Input.anyKey)
        {
            super.Update();
            return;
        }
        
        var left = car.distanceToLeftRailing;
        var right = car.distanceToRightRailing;
        var angle = car.angleToRoadCosine;

        if (left + right > 0)
        {
            if (Mathf.Abs(angle) > 0.1)
            {
                super.Steer = Mathf.Clamp(2 * angle, -1, 1);
            }
            else
            {
                super.Steer = 0.5 * (right - left)/(right + left);
            }
            
            super.Throttle = Mathf.Clamp(1 - Mathf.Abs(super.Steer), -0.1, 0.1);
        }
        else
        {
            super.Steer = 0;
            super.Throttle = 0;
        }
    }
}
