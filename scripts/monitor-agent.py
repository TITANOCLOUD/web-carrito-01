#!/usr/bin/env python3
"""
Script de monitoreo para enviar datos SNMP a Saturno Cloud Panel
Instalar: pip3 install psutil requests cpuinfo py-cpuinfo
Ejecutar: python3 monitor-agent.py
"""

import psutil
import requests
import json
import time
import socket
import platform
from datetime import datetime
import subprocess

# Configuración
API_ENDPOINT = "https://tu-dominio.com/api/metrics/ingest"
API_KEY = "TU_API_KEY_AQUI"  # Cambiar por tu API key
HOST_ID = "cluster-01"  # ID único del servidor
INTERVAL = 60  # Enviar métricas cada 60 segundos

def get_cpu_info():
    """Obtiene información detallada del CPU"""
    try:
        # Intentar obtener modelo del CPU
        if platform.system() == "Linux":
            with open("/proc/cpuinfo") as f:
                for line in f:
                    if "model name" in line:
                        model = line.split(":")[1].strip()
                        break
        else:
            model = platform.processor()
        
        # Detectar vendor (Intel/AMD)
        vendor = "Unknown"
        if "Intel" in model:
            vendor = "Intel"
        elif "AMD" in model:
            vendor = "AMD"
        
        return {
            "usage": psutil.cpu_percent(interval=1),
            "cores": psutil.cpu_count(logical=False),
            "threads": psutil.cpu_count(logical=True),
            "model": model,
            "vendor": vendor,
            "freq": psutil.cpu_freq().current if psutil.cpu_freq() else 0,
        }
    except Exception as e:
        print(f"Error obteniendo CPU info: {e}")
        return {
            "usage": 0,
            "cores": 0,
            "threads": 0,
            "model": "Unknown",
            "vendor": "Unknown",
            "freq": 0,
        }

def get_memory_info():
    """Obtiene información de memoria RAM"""
    mem = psutil.virtual_memory()
    return {
        "total": mem.total // (1024 * 1024),  # MB
        "used": mem.used // (1024 * 1024),
        "free": mem.available // (1024 * 1024),
        "cached": getattr(mem, 'cached', 0) // (1024 * 1024),
        "percent": mem.percent,
    }

def get_disk_info():
    """Obtiene información de discos"""
    disks = []
    for partition in psutil.disk_partitions():
        try:
            usage = psutil.disk_usage(partition.mountpoint)
            disks.append({
                "name": partition.device,
                "mountPoint": partition.mountpoint,
                "fstype": partition.fstype,
                "size": usage.total // (1024 * 1024),  # MB
                "used": usage.used // (1024 * 1024),
                "free": usage.free // (1024 * 1024),
                "percent": usage.percent,
            })
        except PermissionError:
            continue
    return disks

def get_network_info():
    """Obtiene información de interfaces de red"""
    interfaces = []
    net_io = psutil.net_io_counters(pernic=True)
    
    for iface, stats in net_io.items():
        # Intentar obtener velocidad de la interfaz
        speed = "Unknown"
        try:
            if platform.system() == "Linux":
                with open(f"/sys/class/net/{iface}/speed") as f:
                    speed_mbps = int(f.read().strip())
                    if speed_mbps >= 1000:
                        speed = f"{speed_mbps // 1000} Gbps"
                    else:
                        speed = f"{speed_mbps} Mbps"
        except:
            pass
        
        interfaces.append({
            "name": iface,
            "status": "up",
            "speed": speed,
            "rx": stats.bytes_recv,
            "tx": stats.bytes_sent,
            "packets_rx": stats.packets_recv,
            "packets_tx": stats.packets_sent,
        })
    
    return {
        "interfaces": interfaces,
        "totalRx": sum(i["rx"] for i in interfaces),
        "totalTx": sum(i["tx"] for i in interfaces),
    }

def get_system_info():
    """Obtiene información del sistema operativo"""
    boot_time = datetime.fromtimestamp(psutil.boot_time())
    uptime = datetime.now() - boot_time
    days = uptime.days
    hours, remainder = divmod(uptime.seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    
    return {
        "osVersion": f"{platform.system()} {platform.release()} ({platform.version()})",
        "uptime": f"{days} days, {hours:02d}:{minutes:02d}:{seconds:02d}",
        "hostname": socket.gethostname(),
        "kernelVersion": platform.release(),
        "architecture": platform.machine(),
    }

def get_hardware_info():
    """Obtiene lista de hardware instalado"""
    hardware = []
    
    # CPU
    cpu_info = get_cpu_info()
    hardware.append(f"{cpu_info['model']} ({cpu_info['cores']} cores, {cpu_info['threads']} threads)")
    
    # RAM
    mem = psutil.virtual_memory()
    hardware.append(f"{mem.total // (1024**3)} GB RAM")
    
    # Discos
    for disk in get_disk_info():
        size_gb = disk['size'] // 1024
        hardware.append(f"{disk['name']} - {size_gb} GB ({disk['fstype']})")
    
    return hardware

def ping_host(host="8.8.8.8"):
    """Hace ping a un host para medir latencia"""
    try:
        if platform.system() == "Windows":
            result = subprocess.run(
                ["ping", "-n", "1", host],
                capture_output=True,
                text=True,
                timeout=5
            )
        else:
            result = subprocess.run(
                ["ping", "-c", "1", host],
                capture_output=True,
                text=True,
                timeout=5
            )
        
        # Extraer tiempo de respuesta
        output = result.stdout
        if "time=" in output:
            time_str = output.split("time=")[1].split()[0]
            return float(time_str.replace("ms", ""))
    except:
        pass
    return None

def collect_metrics():
    """Recolecta todas las métricas del servidor"""
    print(f"[{datetime.now()}] Recolectando métricas...")
    
    metrics = {
        "hostId": HOST_ID,
        "timestamp": datetime.now().isoformat(),
        "cpu": get_cpu_info(),
        "memory": get_memory_info(),
        "disks": get_disk_info(),
        "network": get_network_info(),
        "system": get_system_info(),
        "hardware": get_hardware_info(),
        "ping": ping_host(),
    }
    
    return metrics

def send_metrics(metrics):
    """Envía las métricas al servidor"""
    try:
        headers = {
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
        }
        
        response = requests.post(
            API_ENDPOINT,
            json=metrics,
            headers=headers,
            timeout=10
        )
        
        if response.status_code == 200:
            print(f"✓ Métricas enviadas correctamente")
            return True
        else:
            print(f"✗ Error al enviar métricas: {response.status_code}")
            print(f"  Respuesta: {response.text}")
            return False
            
    except Exception as e:
        print(f"✗ Error de conexión: {e}")
        return False

def main():
    """Función principal"""
    print("=" * 60)
    print("Saturno Cloud Panel - Monitor Agent")
    print("=" * 60)
    print(f"Host ID: {HOST_ID}")
    print(f"Endpoint: {API_ENDPOINT}")
    print(f"Intervalo: {INTERVAL} segundos")
    print("=" * 60)
    print()
    
    while True:
        try:
            # Recolectar métricas
            metrics = collect_metrics()
            
            # Enviar al servidor
            send_metrics(metrics)
            
            # Esperar hasta el próximo envío
            print(f"Esperando {INTERVAL} segundos...\n")
            time.sleep(INTERVAL)
            
        except KeyboardInterrupt:
            print("\n\nDeteniendo monitor agent...")
            break
        except Exception as e:
            print(f"Error inesperado: {e}")
            time.sleep(INTERVAL)

if __name__ == "__main__":
    main()
