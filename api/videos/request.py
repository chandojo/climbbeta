import json

def read_combined_video_data(self, **kwargs):
    all_video_response= 'api/videos/' + str(self.city) + ' ' + str(self.city.state.abbrv) + '-combined.json'

    with open(all_video_response, 'r') as read_file:
        data = json.load(read_file)

    return data
