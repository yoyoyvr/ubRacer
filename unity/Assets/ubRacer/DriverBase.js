protected var carSensors : CarSensorState = null;

private var m_Throttle : float;
private var m_Steer : float;
private var m_Handbrake : boolean;

function get Throttle() : float { return m_Throttle; }
protected function set Throttle(value : float)
{
    // Quick lerp, for smoothness.
    value = Mathf.Lerp(m_Throttle, value, Time.deltaTime * 3);
    m_Throttle = Mathf.Clamp(value, -1, 1);
}

function get Steer() : float { return m_Steer; }
protected function set Steer(value : float)
{
    // Quick lerp, for smoothness.
    value = Mathf.Lerp(m_Steer, value, Time.deltaTime * 3);
    m_Steer = Mathf.Clamp(value, -1, 1);
}

function get Handbrake() : boolean { return m_Handbrake; }
protected function set Handbrake(value : boolean) { m_Handbrake = value; }

public function UpdateSensors(sensors : CarSensorState)
{
    carSensors.CopyFrom(sensors);
}

function Awake()
{
    carSensors = new CarSensorState();
}

function OnGUI()
{
    if (carSensors)
    {
        GUILayout.Label("forward: " + carSensors.forward);
        GUILayout.Label("backward: " + carSensors.backward);
        GUILayout.Label("leftward: " + carSensors.leftward);
        GUILayout.Label("rightward: " + carSensors.rightward);
    }
}

function OnDrawGizmos()
{
    if (carSensors && Application.isPlaying)
    {
        var pos = transform.position + Vector3.up * 1.0f;
        Gizmos.color = Color.blue;
        Gizmos.DrawLine(pos, pos + transform.right * carSensors.toRightObstacle);
        Gizmos.color = Color.yellow;
        Gizmos.DrawLine(pos, pos - transform.right * carSensors.toLeftObstacle);
        Gizmos.color = Color.green;
        Gizmos.DrawLine(pos, pos + transform.forward * carSensors.toFrontObstacle);
        Gizmos.color = Color.red;
        Gizmos.DrawLine(pos, pos - transform.forward * carSensors.toBackObstacle);
    }
}
