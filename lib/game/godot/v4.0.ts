export function generate(params: any): string {
	return `; Engine configuration file.
; It's best edited using the editor UI and not directly,
; since the parameters that go here are not all obvious.

config_version=5

[application]

config/name="My Game"
config/description="A Godot game"
config/version="1.0.0"
config/icon="res://icon.svg"

[display]

window/size/viewport_width=1920
window/size/viewport_height=1080
window/size/resizable=true
window/size/borderless=false
window/size/fullscreen=false

[rendering]

renderer/rendering_method="forward_plus"
environment/defaults/default_clear_color=Color(0, 0, 0, 1)

[input]

jump={
    "deadzone": 0.5,
    "events": [Object(InputEventKey,"resource_local_to_scene":false,"resource_name":"","device":-1,"window_id":0,"alt_pressed":false,"shift_pressed":false,"ctrl_pressed":false,"meta_pressed":false,"pressed":false,"keycode":0,"physical_keycode":32,"key_label":0,"unicode":32,"echo":false,"script":null)
]
}`;
}
