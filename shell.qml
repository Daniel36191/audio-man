import Quickshell
import QtQuick
import QtQuick.Controls
import Quickshell.Services.Pipewire

FloatingWindow {
  implicitWidth: 500
  implicitHeight: 400

  property var node: null
  property int targetId: 74

  function updateNode() {
    if (!Pipewire.nodes) return
    
    for (var i = 0; i < Pipewire.nodes.count; i++) {
      var n = Pipewire.nodes.get(i)
      if (n && n.id === targetId) {
        node = n
        console.log("✓ Found node:", n.id, n.name, n.description)
        return
      }
    }
    node = null
    console.log("✗ Node ID", targetId, "not found")
  }

  PwObjectTracker {
    objects: node ? [node] : []
  }

  // Try different signal names
  Connections {
    target: Pipewire
    
    function onNodeAdded(node) {
      console.log("Node added event - ID:", node.id, node.name)
      if (node.id === targetId) {
        node = node
      }
    }
  }

  Connections {
    target: node?.audio
    function onVolumeChanged(vol) {
      comms.value = vol
    }
  }

  // Debug: log all properties of Pipewire
  Component.onCompleted: {
    console.log("Pipewire properties:")
    for (var prop in Pipewire) {
      console.log("  -", prop)
    }
  }

  TextField {
    id: idInput
    anchors {
      top: parent.top
      topMargin: 10
      horizontalCenter: parent.horizontalCenter
    }
    width: 100
    text: targetId.toString()
    validator: IntValidator { bottom: 0; top: 999 }
    horizontalAlignment: TextInput.AlignHCenter
    
    onTextChanged: {
      targetId = parseInt(text)
      updateNode()
    }
  }

  Slider {
    id: comms
    anchors.centerIn: parent
    enabled: node !== null

    from: 0
    value: node?.audio?.volume ?? 0
    to: 1
    stepSize: 0.01

    onValueChanged: {
      if (node?.audio) {
        node.audio.volume = value
      }
    }
  }

  Text {
    anchors.top: comms.bottom
    anchors.topMargin: 10
    anchors.horizontalCenter: parent.horizontalCenter
    text: node ? node.name + " (" + node.id + ")" : "Waiting for node ID: " + targetId
  }
  
  Text {
    anchors.bottom: parent.bottom
    anchors.bottomMargin: 40
    anchors.horizontalCenter: parent.horizontalCenter
    text: node?.audio ? Math.round(node.audio.volume * 100) + "%" : "waiting..."
  }

  Row {
    anchors.bottom: parent.bottom
    anchors.horizontalCenter: parent.horizontalCenter
    spacing: 10
    
    Button {
      text: "Scan Nodes"
      onClicked: {
        console.log("\n=== CURRENT NODES ===")
        if (Pipewire.nodes) {
          for (var i = 0; i < Pipewire.nodes.count; i++) {
            var n = Pipewire.nodes.get(i)
            console.log("ID:", n.id, "| Name:", n.name)
          }
        }
      }
    }
    
    Button {
      text: "Use Default Sink"
      onClicked: {
        node = Pipewire.defaultAudioSink
        if (node) {
          targetId = node.id
          idInput.text = targetId.toString()
          console.log("Using default sink:", node.id, node.name)
        }
      }
    }
  }
}