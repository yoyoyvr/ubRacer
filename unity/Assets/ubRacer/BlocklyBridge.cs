using UnityEngine;

public class BlocklyBridge : MonoBehaviour
{
    public string BlocklyMessage;
    public GUIStyle MessageStyle;
    
    void Start()
    {
    }

    void Update()
    {
    }
    
    void OnGUI()
    {
        if (BlocklyMessage != null)
        {
            GUILayout.Label(BlocklyMessage, MessageStyle, GUILayout.ExpandWidth(true));
        }
    }
    
    void Print(string message)
    {
        BlocklyMessage = message;
    }
    
    void SetValue(string keyValue)
    {
        if (keyValue == null)
        {
            return;
        }
        
        string[] bits = keyValue.Split(new char[] {'='}, 2);
        if (bits.Length == 2)
        {
            string key = bits[0];
            string val = bits[1];
            Application.ExternalCall("ubRacer.setValue", key, val);
        }
    }
}
