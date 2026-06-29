# Embedded Strain Monitoring System

![Electronic System](https://raw.githubusercontent.com/Hemanth3247/EmbeddedStrainMonitoringSystem/master/Media/ElectronicSystem.jpg)

A compact real-time strain monitoring system using a quarter-bridge strain gauge, HX711 24-bit ADC/amplifier, and an ESP32 microcontroller.

## Overview
This project measures minute deformations on a cantilever beam using a bonded quarter-bridge strain gauge. The Wheatstone quarter-bridge converts the gauge resistance change into a small differential voltage, the HX711 amplifies and digitizes it, and an ESP32 reads the HX711 to compute and display real-time strain values. A potentiometer is included for bridge balancing and calibration to ensure accurate and stable measurements. The system is ideal for structural testing, lab experiments, and educational demonstrations of strain analysis.

## Features
- Real-time strain computation and display
- 24-bit ADC resolution using HX711 for high sensitivity
- Bridge balancing via potentiometer
- Simple, low-cost hardware components
- Ready for ESP32 (Arduino or PlatformIO)

## Hardware Required
- ESP32 development board
- HX711 24-bit load cell amplifier (or breakout)
- Quarter-bridge strain gauge bonded to a cantilever beam
  
  ![Bending beam with strain gauge](https://raw.githubusercontent.com/Hemanth3247/EmbeddedStrainMonitoringSystem/master/Media/BendingBeam_StrainGuage.jpg)

- Potentiometer (10k recommended) for bridge balance
- Excitation voltage source (usually the HX711 provides AVCC)
- Wires, soldering tools, breadboard or PCB
- Optional: OLED / serial terminal for display

## Typical Circuit / Wiring
(See images in the `Media/` folder for reference.)

- Strain gauge: wired as a quarter-bridge (one active leg + three fixed resistors)
- Potentiometer: connected in the bridge for fine balance adjustment
- HX711:
  - E+ / AVCC: bridge excitation
  - E- / GND: bridge ground
  - A+ / A-: differential input from the bridge (active gauge leg vs reference)
  - DT: to ESP32 data pin (e.g., GPIO 4)
  - SCK: to ESP32 clock pin (e.g., GPIO 5)
  - VCC: 3.3V from ESP32
  - GND: common ground
- ESP32:
  - 3.3V -> HX711 VCC
  - GND -> HX711 GND -> Bridge ground
  - GPIOx -> HX711 DT / SCK (choose free GPIOs that work with your board)

Example mapping (change pins in code to match your wiring):
- HX711 DT -> ESP32 GPIO 4
- HX711 SCK -> ESP32 GPIO 5

Circuit references:

![Wheatstone Bridge](https://raw.githubusercontent.com/Hemanth3247/EmbeddedStrainMonitoringSystem/master/Media/WheatStoneBridge_circuit2.jpg)

![Amplifier Circuit](https://raw.githubusercontent.com/Hemanth3247/EmbeddedStrainMonitoringSystem/master/Media/AmplifierCircuit.jpg)

![Wiring Example](https://raw.githubusercontent.com/Hemanth3247/EmbeddedStrainMonitoringSystem/master/Media/Electronic%20Wiring.jpg)

## Software / Libraries
- ESP32 board support (Arduino core for ESP32) or PlatformIO with an ESP32 environment
- Recommended HX711 library (Arduino):
  - "HX711" by Bogdan Necula (bogde) OR
  - "HX711_ADC" by Olav Kjørven (for advanced calibration and filtering)
- Serial monitor or optional OLED/LCD to display strain in real time

## Installation (Arduino IDE)
1. Install ESP32 board support (Instructions: Boards Manager → add Espressif URL → install esp32).
2. Install HX711 library via Library Manager (search for "HX711" or "HX711_ADC").
3. Open the provided example sketch (e.g., `Codes/StrainMonitor/StrainMonitor.ino` if included).
4. Update pin definitions and calibration factor in the sketch to match your wiring and calibration.
5. Upload to the ESP32 and open Serial Monitor at the configured baud rate (e.g., 115200).

## Installation (PlatformIO)
1. Create a PlatformIO project for your ESP32 board.
2. Add the HX711 library to `platformio.ini` via `lib_deps`.
3. Copy the source files into `src/` (or `Codes/`) and configure pins/calibration in `src/main.cpp`.
4. Build and upload with PlatformIO.

## Calibration Procedure
1. With no load applied, adjust the potentiometer to zero the bridge output (or run a software tare / zero routine).
2. Apply a known load (or apply a known strain through a calibration jig).
3. Record the raw ADC value (average multiple samples).
4. Compute the calibration factor:
   - calibration_factor = (known_strain) / (raw_value - zero_offset)
5. Enter the calibration_factor into the firmware. The firmware converts incoming ADC readings into strain using:
   - strain = (raw_value - zero_offset) * calibration_factor
6. Verify linearity with several known loads and adjust if necessary.

Notes:
- HX711 outputs are proportional to the bridge differential voltage. The conversion to strain depends on the gauge factor (GF) of the strain gauge and the bridge configuration.
- If you prefer, compute strain via converting ADC reading → mV/V → ΔR/R → strain using gauge factor.

## Usage
- Power the ESP32 and HX711, ensure bridge is excited.
- Launch the serial monitor to view real-time strain values or use the on-board display if connected.
- Use a simple UI in the firmware to trigger tare, calibrate, and switch display units.

## Data Output
Typical outputs from the serial monitor:
- Timestamp, strain (microstrain or ε), raw ADC value
Example:
1627543200, 125.4 µε, raw=838720

## Demo Video
Watch the system in action:

[Whole System Demo](https://github.com/Hemanth3247/EmbeddedStrainMonitoringSystem/blob/master/Media/Whole%20SystemDemo.mp4)

## Troubleshooting
- No readings / constant value:
  - Check wiring (DT/SCK, VCC/GND).
  - Ensure HX711 VCC is 3.3V when using ESP32 (do not use 5V unless all devices tolerate it).
  - Try swapping DT/SCK pins or slower SCK pulses if using custom code.
- Very noisy readings:
  - Re-check bridge grounding and wiring routing to minimize EMI.
  - Add shielding or averaging/filtering in software.
  - Ensure the bridge is balanced (use the potentiometer) to center the ADC.
- Wrong scale:
  - Re-do calibration. Verify the known reference load and gauge factor used.

## Files & Folders (in this repo)
- `Codes/` — ESP32 firmware code (examples live here)
- `Documentation/` — project documentation, reports
- `Media/` — circuit images, photos, and demo video (used in this README)
- `CAD_Files/` — CAD files for fixtures

## References
- HX711 datasheet — for wiring and timing details
- Strain gauge and Wheatstone bridge application notes
- HX711 Arduino libraries and examples

## Contributing
Contributions welcome — please open issues for problems or feature requests and submit pull requests for fixes and enhancements.

## License
Choose a license (e.g., MIT). Add a LICENSE file to this repository to make your choice explicit.

## Contact
Maintainer: Hemanth3247 (GitHub)
For questions or collaboration, open an issue or reach out via GitHub.
