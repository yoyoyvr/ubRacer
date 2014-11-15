using System.Collections.Generic;
using UnityEngine;

public class BlocklyBridge : MonoBehaviour
{
    public string BlocklyMessage;
    public GUIStyle MessageStyle;
    
    private Dictionary<string,object> KeyValueStore = new Dictionary<string,object>();
    
    void OnGUI()
    {
        if (BlocklyMessage != null)
        {
            GUILayout.Label(BlocklyMessage, MessageStyle, GUILayout.ExpandWidth(true));
        }
    }
    
    // Incoming message from web page.
    void Print(string message)
    {
        BlocklyMessage = message;
    }

    // Outgoing value to web page.
    public void PostValue(string key, object val)
    {
        object oldVal;
        KeyValueStore.TryGetValue(key, out oldVal);
        if (!val.Equals(oldVal))
        {
            Application.ExternalCall("ubRacer.setValue", key, val.ToString());
            KeyValueStore[key] = val;
        }
    }

    // For testing.
    public object GetValue(string key)
    {
        object val = null;
        KeyValueStore.TryGetValue(key, out val);
        return val;
    }
}
