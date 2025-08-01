import requests
class Backend():
    
    def __init__(self):
        self.productID = 0
        self.lat = 0
        self.long =0
        self.apikey = 'Bearer V64BVVPQM9431DHQYVC8P5WEM4'
    def call_seaapi(self):
        
        resp = requests.post('https://api.climatiq.io/freight/v2/intermodal',headers={'Authorization': self.apikey},data = {
        "emission_factor": {
            "activity_id": "electricity-supply_grid-source_residual_mix",
            "data_version": "^21"
        },
        "parameters":
            {
            "energy": 4200,
            "energy_unit": "kWh"
            }
        })
        print(resp.text)

b1 = Backend()
b1.call_seaapi()        
