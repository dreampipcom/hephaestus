from stability_sdk import api
from stability_sdk.animation import AnimationArgs, Animator
from stability_sdk.utils import create_video_from_frames
from tqdm import tqdm
import math
from datetime import datetime

length_in_seconds = 4
fps = 8
base_prompt="hyper realism, hyper detailed, octane render, unreal engine, raytracing, volumetric lighting, cinematic lighting, soft natural lighting, visual clarity, tone mapping, color grading, enhance, retouch"
positive_prompts = [
    "someone stopping a train",
    "an african someone stopping a train",
    "an african someone stopping a rocket",
    "someone stopping a black rocket"
]
zoom_evolution = [2, 10, 20, 30]
angle_evolution = [1, 2, 3, 4]
rotation_z_evolution = [0,0,0,0]
negative_prompt = "text, blurry, low resolution"


now = datetime.now()
dt_string = now.strftime("%Y-%m-%d-%H_%M_%S")

dest = "video_{}".format(dt_string)

def generate_keyframe_dict_4er(total_frames, strings, base=False):
    quarter_dict = {}
    for i in range(4):
        quarter_increment = total_frames / 4
        increment = math.floor(i * quarter_increment)
        if(base):
            quarter_dict[increment] = strings[i] + ", {}".format(base)
        else:
            quarter_dict[increment] = strings[i]
    return quarter_dict

def generate_keyframe_string(total_frames, values, lower=False):
    quarter_string = ""
    for i in range(4):
        quarter_increment = total_frames / 4
        increment = math.floor(i * quarter_increment)
        # if(base):
        #     quarter_dict[increment] = [strings[i], base]
        # else:
        quarter_string += ", {}:({})".format(increment, values[i])
        if(lower):
            quarter_string += ", {}:({})".format(increment + 1, lower)
    return quarter_string

STABILITY_HOST = "grpc.stability.ai:443"
STABILITY_KEY = $STABILITY_KEY # API key from https://platform.stability.ai/account/keys

api_context = api.Context(STABILITY_HOST, STABILITY_KEY)

# Configure the animation
args = AnimationArgs()
args.interpolate_prompts = True
args.locked_seed = True
args.width = 1024
args.height =768
args.max_frames = length_in_seconds * fps
args.seed = 42
args.strength_curve = "0:(0)"
args.diffusion_cadence_curve = "0:(0)"
args.cadence_interp = "film"
args.fps = fps
args.preset = "3d-model" #None, 3d-model, analog-film, anime, cinematic, comic-book, digital-art, enhance fantasy-art, isometric, line-art, low-poly, modeling-compound, neon-punk, origami, photographic, pixel-art
# args.video_init_path = ""  #if you want to start with a video
# args.init_image = "init_images/05.jpeg"  #if you want to start with an image
args.init_sizing = "cover"
args.steps_curve = generate_keyframe_string(args.max_frames, [80, 50, 50, 50], 30)

# stable-diffusion-v1
# stable-diffusion-v1-5
# stable-diffusion-512-v2-0
# stable-diffusion-768-v2-0
# stable-diffusion-512-v2-1
# stable-diffusion-768-v2-1
# stable-diffusion-xl-beta-v2-2-2
# stable-diffusion-xl-1024-v0-9
# stable-diffusion-depth-v2-0
args.model = "stable-diffusion-xl-1024-v0-9"

animation_prompts = generate_keyframe_dict_4er(args.max_frames, positive_prompts, base_prompt)
args.zoom = generate_keyframe_string(args.max_frames, zoom_evolution)
args.angle = generate_keyframe_string(args.max_frames, angle_evolution)
args.rotation_z= generate_keyframe_string(args.max_frames, rotation_z_evolution)

# Create Animator object to orchestrate the rendering
animator = Animator(
    api_context=api_context,
    animation_prompts=animation_prompts,
    negative_prompt=negative_prompt,
    args=args,
    out_dir=dest
)

# # Render each frame of animation
# for idx, frame in enumerate(animator.render()):
#     frame.save(f"frame_{idx:05d}.png")


try:
    for _ in tqdm(animator.render(), total=args.max_frames):
      pass
except ClassifierException:
    print("Animation terminated early due to NSFW classifier.")
except OutOfCreditsException as e:
    print(f"Animation terminated early, out of credits.\n{e.details}")
except Exception as e:
    print(f"Animation terminated early due to exception: {e}")



create_video_from_frames(animator.out_dir, "{}/video_{}.mp4".format(dest, dt_string), fps)