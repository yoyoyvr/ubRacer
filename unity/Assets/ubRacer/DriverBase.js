var sensorLineMaterial : Material;

protected var sensors : CarSensorState;

private var m_Throttle : float;
private var m_Steer : float;
private var m_Handbrake : boolean;

private var m_Rigidbody : Rigidbody;

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

protected function Awake()
{
    sensors = new CarSensorState(gameObject, sensorLineMaterial);
    
    // Assumes driver is parented to its vehicle.
    m_Rigidbody = GetComponentInParent(Rigidbody);
}

protected function FixedUpdate()
{
    sensors.Update(m_Rigidbody);
}

function OnDrawGizmos()
{
    if (sensors && Application.isPlaying)
    {
        for (var feeler in sensors.feelers)
        {
            Gizmos.color = feeler.color;
            Gizmos.DrawLine(feeler.start, feeler.point);
        }
    }
}

class Feeler
{
    // Inputs control the raycast.
    var name = "";
    var color = Color.magenta;
    var offset : Vector3;
    var direction : Vector3;
    var length : float;
    var layers : LayerMask = -1;
    
    // Outputs based on detected hit.
    var sensed : boolean;
    var start : Vector3;
    var point : Vector3;
    var distance : float;
    var normal : Vector3;
    var hit : RaycastHit;
    
    var lineRenderer : LineRenderer;
    
    function Feeler(name : String, color : Color, offset : Vector3, direction : Vector3, length : float, layers : LayerMask, gameObject : GameObject, sensorLineMaterial : Material)
    {
        this.name = name;
        this.color = color;
        this.offset = offset;
        this.direction = direction;
        this.length = length;
        this.layers = layers;
        
        var feelerObject = new GameObject(name);
        feelerObject.transform.parent = gameObject.transform;
        feelerObject.transform.localPosition = Vector3.zero;
        
        lineRenderer = feelerObject.AddComponent("LineRenderer");
        lineRenderer.material = sensorLineMaterial;
        lineRenderer.SetColors(color, color);
        lineRenderer.SetWidth(0.02, 0.2);
        lineRenderer.SetVertexCount(2);
    }
    
    function Sense(relativeTo : Transform)
    {
        this.start = relativeTo.position
            + relativeTo.forward * this.offset.x
            + relativeTo.up * this.offset.y
            + relativeTo.right * this.offset.z;
        var dir =
              relativeTo.forward * this.direction.x
            + relativeTo.up * this.direction.y
            + relativeTo.right * this.direction.z;
    
        // Note: if no hit then keep previous value.
        this.sensed = Physics.Raycast(this.start, dir, this.hit, this.length, this.layers);
        if (this.sensed)
        {
            this.point = hit.point;
            this.distance = hit.distance;
            this.normal = relativeTo.InverseTransformDirection(hit.normal);
            lineRenderer.SetPosition(0, this.start);
            lineRenderer.SetPosition(1, hit.point);
        }
        else
        {
            // Hide the line when nothing sensed.
            lineRenderer.SetPosition(0, this.start);
            lineRenderer.SetPosition(1, this.start);
        }
    }
}

class CarSensorState
{
    var speed : float;
    var feelers = new Array();
    var gameObject : GameObject;
    var sensorLineMaterial : Material;
    
    function CarSensorState(gameObject : GameObject, sensorLineMaterial : Material)
    {
        this.gameObject = gameObject;
        this.sensorLineMaterial = sensorLineMaterial;
    }
    
    function Update(rigidbody : Rigidbody)
    {
        // The rigidbody velocity is always given in world space, but in order to work in local space of the car model we need to transform it first.
        var xform = rigidbody.transform;
        var relativeVelocity : Vector3 = xform.InverseTransformDirection(rigidbody.velocity);
        this.speed = relativeVelocity.magnitude;
        
        for (var i = 0; i < this.feelers.length; ++i)
        {
            this.feelers[i].Sense(xform);
        }
    }
    
    function AddFeeler(name : String, color : Color, offset : Vector3, direction : Vector3, length : float, layers : LayerMask)
    {
        feelers.push(new Feeler(name, color, offset, direction, length, layers, gameObject, sensorLineMaterial));
    }
    
    function GetFeeler(name : String) : Feeler
    {
        for (var feeler in this.feelers)
        {
            if (feeler.name == name)
            {
                return feeler;
            }
        }
    }
}
