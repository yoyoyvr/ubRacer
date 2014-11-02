public class InputDriver extends DriverBase
{
    protected function Update()
    {
        super.Throttle = Input.GetAxis("Vertical");
        super.Steer = Input.GetAxis("Horizontal");
        super.Handbrake = Input.GetKey("space");
    }
}
