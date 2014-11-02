private var m_Throttle : float;
private var m_Steer : float;
private var m_Handbrake : boolean;

// TODO: lerping in here, for smoothness

function get Throttle() : float { return m_Throttle; }
protected function set Throttle(value : float) { m_Throttle = Mathf.Clamp(value, -1, 1); }

function get Steer() : float { return m_Steer; }
protected function set Steer(value : float) { m_Steer = Mathf.Clamp(value, -1, 1); }

function get Handbrake() : boolean { return m_Handbrake; }
protected function set Handbrake(value : boolean) { m_Handbrake = value; }
